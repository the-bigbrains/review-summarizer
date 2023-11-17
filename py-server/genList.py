import ast
from typing import Any, Coroutine, List
from kernel import kernel
import semantic_kernel as sk
import os
import asyncio


async def generateList(reviews: List[str], type: str):
    print("genList start")

    pluginDir = os.path.join(__file__, "../Plugins")
    plugin = kernel.import_semantic_skill_from_directory(
        pluginDir, "SomePlugin")

    unresolvedResults = []

    print("reviews:", reviews)

    for item in reviews:
        context = sk.ContextVariables()
        context["reviews"] = item
        context["type"] = type
        print("context:", context["reviews"])
        # test = await kernel.run_async(plugin["Summarize"], input_vars=context)
        unresolvedResults.append(kernel.run_async(
            plugin["Summarize"], input_vars=context))

    print("gathering...")
    # results = await asyncio.gather(*unresolvedResults)
    results = unresolvedResults

    restinpeach = [item.dict()["variables"]["variables"]["input"]
                   for item in results]

    print("resultStringified:", restinpeach)

    newContext = sk.ContextVariables()
    newContext["reviews"] = str(restinpeach)
    yeet = await kernel.run_async(plugin["GenListNew"], input_vars=newContext)
    print("yeet:", yeet.dict())
    print("yeet input:", yeet.dict()["variables"]["variables"]["input"])

    return yeet.dict()["variables"]["variables"]["input"]
