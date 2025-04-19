import { createGroqChatCompletion } from "../../../application/services/groq.service";
import { GroqCompletionOptions, GroqMessage } from "../../../infrastructure/config/groqClient";

export class GenerateCompletionUseCase {
  async execute(messages: GroqMessage[], options?: GroqCompletionOptions) {
    return createGroqChatCompletion(messages, options);
  }
}