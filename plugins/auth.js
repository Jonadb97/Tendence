export default function ({ $auth }) {
    const role = $auth.user.role
    if (!$auth.loggedIn) {
        return{role}
    }
}