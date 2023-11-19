from typing import Any, Coroutine, List
from kernel import kernel
import semantic_kernel as sk
import os
import asyncio


async def generateSummaries(reviews: List[str], type: str):
    print(f"gen {type} summary start")

    pluginDir = os.path.join(__file__, "../Plugins")
    plugin = kernel.import_semantic_skill_from_directory(
        pluginDir, "SomePlugin")

    print(f"{type} reviews:", reviews)

    unresolvedResults: List[Coroutine[Any, Any, sk.SKContext[Any]]] = []
    # generate promises for each review
    for review in reviews:
        context = sk.ContextVariables()
        context["reviews"] = review
        context["type"] = type
        unresolvedResults.append(kernel.run_async(
            plugin["Summarize"], input_vars=context))

    print(f"resolving {type}...")
    # resolve promises in parallel
    summarizeResults: List[sk.SKContext[Any]] = await asyncio.gather(*unresolvedResults)

    # sanitize items and flatten array
    summaryArray = [{"summary": summary, "index": index} for index, Summaries in enumerate(summarizeResults) for summary in Summaries.dict(
    )["variables"]["variables"]["input"].replace("- ", "").split("\n")]

    print(f"{type} summary result:", summaryArray)

    filterContext = sk.ContextVariables()
    filterContext["reviews"] = str(summaryArray)
    filterContext["type"] = type
    # generate a filtered list of summary
    filterResult = await kernel.run_async(plugin["Filter"], input_vars=filterContext)

    print(f"{type} filter result:", filterResult.dict()
          ["variables"]["variables"]["input"])
    filteredSummaries = filterResult.dict(
    )["variables"]["variables"]["input"].split("\n")

    return {"all": summaryArray, "filtered": filteredSummaries}
