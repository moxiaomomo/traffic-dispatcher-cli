import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
// import { login, logout } from '@/api/api'
import { getToken, setToken, removeToken } from '@/utils/cookies'
// import router, { resetRouter } from '@/router'
import store from '@/store'

export interface IUserState {
    token: string
    name: string
    avatar: string
    introduction: string
    roles: string[]
    email: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public token = getToken() || ''
    public name = ''
    public avatar = ''
    public introduction = ''
    public roles: string[] = []
    public email = ''

    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token
    }

    @Mutation
    private SET_NAME(name: string) {
        this.name = name
    }

    @Mutation
    private SET_AVATAR(avatar: string) {
        this.avatar = avatar
    }

    @Mutation
    private SET_INTRODUCTION(introduction: string) {
        this.introduction = introduction
    }

    @Mutation
    private SET_ROLES(roles: string[]) {
        this.roles = roles
    }

    @Mutation
    private SET_EMAIL(email: string) {
        this.email = email
    }

    // @Action
    // public async Login(userInfo: { username: string, password: string }) {
    //     let { username, password } = userInfo
    //     username = username.trim()
    //     const { data } = await login({ username, password })
    //     setToken(data.accessToken)
    //     this.SET_TOKEN(data.accessToken)
    // }

    @Action
    public ResetToken() {
        removeToken()
        this.SET_TOKEN('')
        this.SET_ROLES([])
    }

    // @Action
    // public async LogOut() {
    //     if (this.token === '') {
    //         throw Error('LogOut: token is undefined!')
    //     }
    //     await logout()
    //     removeToken()
    //     resetRouter()

    //     this.SET_TOKEN('')
    //     this.SET_ROLES([])
    // }
}

export const UserModule = getModule(User)