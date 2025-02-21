import { makeAutoObservable } from "mobx"


class FriendService { 


    constructor() {
        makeAutoObservable(this)
    }
}