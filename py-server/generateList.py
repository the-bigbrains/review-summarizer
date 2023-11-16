from typing import List
import semantic_kernel as sk
from semantic_kernel.connectors.ai import ChatRequestSettings, CompleteRequestSettings
import ast
from kernel import kernel


async def generateList(reviews: List[str], type: str):
    print("generateList start")

    # GPT prompt
    prompt = """Given an array of reviews for a product, generate a comma separated array of summaries less than 15 words long summarizing the {{$type}} and ONLY the {{$type}} aspects of the product based on the reviews. Consider factors like product features, quality, and user experiences. The output should be short, concise, clear and informative.
    Reviews: {{$reviews}}"""

    # GPT configuration
    promptConfig = sk.PromptTemplateConfig(
        description=f"Get an array of points summarizing the product's ${type} and ONLY the ${type} aspects of the product based on the reviews.",
        type="completion",
        completion=sk.PromptTemplateConfig.CompletionConfig(
            0.0, 0.0, 0.0, 0.0, 500),
    )

    # Create a GPT template based on prompt and config
    promptTemplate = sk.PromptTemplate(
        template=prompt,
        template_engine=kernel.prompt_template_engine, prompt_config=promptConfig
    )

    # create a function config based on GPT template
    function_config = sk.SemanticFunctionConfig(promptConfig, promptTemplate)

    #
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

    # evaluate stringified list to list - fails if the string doesn't properly represent a string.
    return ast.literal_eval(listStringified)
