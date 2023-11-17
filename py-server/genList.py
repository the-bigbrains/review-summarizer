import ast
from typing import Any, Coroutine, List
from kernel import kernel
import semantic_kernel as sk
import os
import asyncio
import re


async def generateList(reviews: List[str], type: str):
    print("genList start")

    pluginDir = os.path.join(__file__, "../Plugins")
    plugin = kernel.import_semantic_skill_from_directory(
        pluginDir, "SomePlugin")

    print("reviews:", reviews)

    unresolvedResults: List[Coroutine[Any, Any, sk.SKContext[Any]]] = []
    # generate promises for reach review
    for review in reviews:
        context = sk.ContextVariables()
        context["reviews"] = review
        context["type"] = type
        unresolvedResults.append(kernel.run_async(
            plugin["Summarize"], input_vars=context))

    print("resolving...")
    # resolve promises in parallel
    summarizeResults: List[sk.SKContext[Any]] = await asyncio.gather(*unresolvedResults)

    # sanitize items and flatten array
    summaryArray = [summary for Summaries in summarizeResults for summary in re.split('[;\n]', Summaries.dict(
    )["variables"]["variables"]["input"].replace("- ", ""))]

    print("result:", summaryArray)

    genListContext = sk.ContextVariables()
    genListContext["reviews"] = str(summaryArray)

    # generate a filtered list of summary
    genListNewResult = await kernel.run_async(plugin["GenListNew"], input_vars=genListContext)

    print("genListResult:", genListNewResult.dict()
          ["variables"]["variables"]["input"])

    # return just the filtered summary list
    return genListNewResult.dict()["variables"]["variables"]["input"]
