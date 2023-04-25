require('dotenv').config()

class xTuringClass {
  queue = []; 
  optionsXTuring = { model: "llama_lora_int4" };
  openai = undefined;

  constructor() {
    this.init().then();
  }

  /**
   * Esta funciona inicializa
   */
  init = async () => {
    const { XTuring } = await import("XTuring");
    this.openai = new xTuringService(
        {
            apiKey: process.env.OPENAI_API_KEY
        }
    );
  };

  /**
   * Manejador de los mensajes
   * sun funcion es enviar un mensaje a wahtsapp
   * @param {*} ctx 
   */
  handleMsgChatGPT = async (body) => {
    const interaccionChatGPT = await this.openai.sendMessage(body, {
      conversationId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].conversationId,
      parentMessageId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].id,
    });

    this.queue.push(interaccionChatGPT);
    return interaccionChatGPT
  };
}

module.exports = ChatGPTClass;
