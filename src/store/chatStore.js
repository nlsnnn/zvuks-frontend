import { makeAutoObservable } from "mobx";
import { ChatService } from "../service/chatService";

class ChatStore {
  messages = [];
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getMessages(userId) {
    try {
      const response = await ChatService.getMessages(userId);
      this.messages = response.data.messages;
      this.user = response.data.user;
    } catch (e) {
      console.log(e);
    }
  }

  async sendMessage(recipientId, content) {
    try {
      const data = {
        recipient: recipientId,
        content: content,
      };
      await ChatService.sendMessage(data);
    } catch (e) {
      console.log(e);
    }
  }

  async editMessage(messageId, content) {
    try {
      const data = {
        id: messageId,
        content: content,
      };
      await ChatService.editMessage(data);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteMessage(messageId) {
    try {
      await ChatService.deleteMessage(messageId);
      this.messages = this.messages.filter((msg) => msg.id !== messageId);
    } catch (e) {
      console.log(e);
    }
  }
}

export const chatStore = new ChatStore();
