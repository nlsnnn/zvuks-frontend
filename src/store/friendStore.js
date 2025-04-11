import { makeAutoObservable } from "mobx";
import { FriendService } from "../service/friendService";
import { UserService } from "../service/userService";

class FriendStore {
  friends = [];
  pending = [];
  sended = [];
  searchResults = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getFriends() {
    this.loading = true;
    try {
      const response = await FriendService.getFriends();
      this.friends = response.data.friends || [];
    } catch (e) {
      this.error = "Ошибка загрузки друзей";
    } finally {
      this.loading = false;
    }
  }

  async getPending() {
    this.loading = true;
    try {
      const response = await FriendService.getPendings();
      this.pending = response.data.requests || [];
    } catch (e) {
      this.error = "Ошибка загрузки запросов";
    } finally {
      this.loading = false;
    }
  }

  async getSended() {
    this.loading = true;
    try {
      const response = await FriendService.getSended();
      this.sended = response.data.requests || [];
    } catch (e) {
      this.error = "Ошибка загрузки отправленных запросов";
    } finally {
      this.loading = false;
    }
  }

  async searchUsers(query) {
    this.loading = true;
    try {
      const response = await UserService.searchUsers(query);
      this.searchResults = response.data.users || [];
    } catch (e) {
      this.error = "Ошибка поиска пользователей";
    } finally {
      this.loading = false;
    }
  }

  async sendRequest(id) {
    try {
      await FriendService.sendRequest({ user_received_id: id });
      this.getSended();
      this.searchUsers("");
    } catch (e) {
      this.error = "Ошибка отправки запроса";
    }
  }

  async acceptRequest(id) {
    try {
      await FriendService.acceptRequest({ user_sended_id: id });
      this.getPending();
      this.getFriends();
    } catch (e) {
      this.error = "Ошибка принятия запроса";
    }
  }

  async rejectRequest(id) {
    try {
      await FriendService.rejectRequest({ user_sended_id: id });
      this.getPending();
    } catch (e) {
      this.error = "Ошибка отклонения запроса";
    }
  }

  async deleteFriend(id) {
    try {
      await FriendService.deleteFriend({ user_id: id });
      this.getFriends();
    } catch (e) {
      this.error = "Ошибка удаления друга";
    }
  }
}

export const friendStore = new FriendStore();
