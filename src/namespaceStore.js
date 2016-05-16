// a simplified example for handling namespaces and their corresponding changes
const namespaceStore = (initialState = {}) => ({
    namespaces: initialState,
    listeners: [],
    get(namespace) {
        return namespace? this.namespaces[namespace] : this.namespaces
    },
    set(namespace, cards) {
        this.namespaces[namespace] = cards
        this.notify()
    },
    subscribe(f) {
        this.listeners.push(f)
        return () => {
            this.listeners = this.listeners.filter(l => {
                return l !== f
            })
        }
    },
    notify() {
        this.listeners.map(l => l(this.namespaces))
    }
})

export default namespaceStore
