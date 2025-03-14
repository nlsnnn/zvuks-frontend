import { makeAutoObservable } from "mobx";
import { ChatService } from "../service/chatService"; 

class ChatStore {
  messages = [];
  username = "none";

  constructor() {
    makeAutoObservable(this);
  }

  async getMessages(userId) {
    try {
      const response = await ChatService.getMessages(userId);
      this.messages = response.data.messages;
      this.username = response.data.username;
    } catch (e) {
      console.log(e);
    }
  }

  async sendMessage(recipientId, content) {
    try {
        const data = {
            'recipient_id': recipientId,
            'content': content
        }
        await ChatService.sendMessage(data)
    } catch (e) {
        console.log(e);
    }
  } 

}

export const chatStore = new ChatStore();
