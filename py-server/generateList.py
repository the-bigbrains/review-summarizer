import ast
from typing import List
from kernel import kernel
import semantic_kernel as sk
import os


async def generateList(reviews: List[str], type: str):

    context = sk.ContextVariables()
    context["reviews"] = str(reviews)
    context["type"] = type

    pluginDir = os.path.join(__file__, "../Plugins")
    plugin = kernel.import_semantic_skill_from_directory(
        pluginDir, "SomePlugin")
    SKResult = await kernel.run_async(plugin["GenerateList"], input_vars=context)

    resultStringified = str(SKResult)
    print("resultStringified:", resultStringified)

    return ast.literal_eval(resultStringified)
