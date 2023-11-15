from typing import List
import semantic_kernel as sk
from semantic_kernel.connectors.ai import ChatRequestSettings, CompleteRequestSettings

from kernel import kernel


async def generateList(reviews: List[str], type: str):

    prompt = """Given an array of reviews for a product, generate a comma separated array of summaries less than 15 words long summarizing the {{$type}} and ONLY the {{$type}} aspects of the product based on the reviews. Consider factors like product features, quality, and user experiences. The output should be short, concise, clear and informative.
    Reviews: {{$reviews}}"""

    prompt_config = sk.PromptTemplateConfig(
        description=f"Get an array of points summarizing the product's ${type} and ONLY the ${type} aspects of the product based on the reviews.",
        type="completion",
        completion=sk.PromptTemplateConfig.CompletionConfig(
            0.0, 0.0, 0.0, 0.0, 500),
    )

    # Create the SemanticFunctionConfig object
    prompt_template = sk.PromptTemplate(
        template=prompt, template_engine=kernel.prompt_template_engine, prompt_config=prompt_config,)
    function_config = sk.SemanticFunctionConfig(prompt_config, prompt_template)

    get_intent = kernel.register_semantic_function(
        skill_name="OrchestratorPlugin",
        function_name="GetIntent",
        function_config=function_config,
    )

    context = sk.ContextVariables()
    context["reviews"] = str(reviews)
    context["type"] = type

    result = await kernel.run_async(
        get_intent,
        input_vars=context
    )

    listStringified: str = result.dict()['variables']['variables']['input']

    return listStringified.split(", ")
