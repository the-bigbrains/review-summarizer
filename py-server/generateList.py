import semantic_kernel as sk
from semantic_kernel.connectors.ai import ChatRequestSettings, CompleteRequestSettings

from kernel import kernel


async def generateList():

    #     prompt = """
    # Given an array of reviews for a product, generate a JSON array of bullet points summarizing the {{$type}} and ONLY the {{$type}} aspects of the product based on the reviews. Consider factors like product features, quality, and user experiences. The output should be less than 15 words while being concise, clear and informative.
    # Reviews: {{$review}}"""

    prompt = """Bot: How can I help you?
User: {{$input}}

---------------------------------------------

The intent of the user in 5 words or less: """

    prompt_config = sk.PromptTemplateConfig(
        description="Gets the intent of the user.",
        type="completion",
        completion=sk.PromptTemplateConfig.CompletionConfig(
            0.0, 0.0, 0.0, 0.0, 500),
        input=sk.PromptTemplateConfig.InputConfig(
            parameters=[
                sk.PromptTemplateConfig.InputParameter(
                    name="input", description="The user's request.", default_value=""
                )
            ]
        ),
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

    result = await kernel.run_async(
        get_intent,
        input_str="I want to send an email to the marketing team celebrating their recent milestone.",
    )

    print(result)
    return result
