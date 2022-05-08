export default async function (context) {
    if(!!!context.store.state.auth.user) {
        return context.redirect(`/${context.store.state.locale}`)
    }
    return;
}