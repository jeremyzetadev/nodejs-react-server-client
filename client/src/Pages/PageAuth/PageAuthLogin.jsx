function PageAuthLogin() {
    return(
        <>
          <h2>This is page PageAuthLogin</h2>
            <div class="login-page">
                <form action="">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username"/>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"/>
                    <button onclick="login()">Login</button>
                </form>
            </div>
        </>
    )
}

export default PageAuthLogin
