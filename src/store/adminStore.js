import { makeAutoObservable } from "mobx";
import { AdminService } from "../service/adminService";
import { toast } from "react-toastify";

class AdminStore {
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async blockUser(userId) {
    try {
      const res = await AdminService.blockUser(userId);
      return res;
    } catch (e) {
      toast.error(e.message);
    }
  }

  async unblockUser(userId) {
    try {
      const res = await AdminService.unblockUser(userId);
      return res;
    } catch (e) {
      toast.error(e.message);
    }
  }
}

export const adminStore = new AdminStore();
