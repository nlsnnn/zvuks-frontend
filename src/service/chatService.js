import { apiClient } from "../api/apiClient";
import { messages } from "../config/constants";

export class ChatService {
  static async getMessages(id) {
    try {
      const response = await apiClient.get(messages + id);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async sendMessage(data) {
    try {
      const response = await apiClient.post(messages, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async editMessage(data) {
    try {
      const response = await apiClient.put(messages, data);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async deleteMessage(msgId) {
    try {
      const response = await apiClient.delete(messages + msgId);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
