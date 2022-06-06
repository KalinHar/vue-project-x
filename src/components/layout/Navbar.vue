<template>
    <nav class="navbar is-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <strong>Project-X</strong>
            </router-link>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link to="/register" class="button is-success">
                            <strong>Register</strong>
                        </router-link>
                        <router-link to="/login" class="button is-light">
                            <strong>Login</strong>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    namr: 'Navbar',
}
</script>
