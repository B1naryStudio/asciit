<form action="/user/login">
    <div class="login-form">
        <div class="form-horizontal">
            <div class="error all"></div>
            <div class="control-group">
                <label for="email" class="control-label">Email</label>
                <input type="text" name="email" class="email" placeholder="Email">
                <div class="error email"></div>
            </div>

            <div class="control-group">
                <label for="password" class="control-label">Password</label>
                <input type="text" name="password" class="password" placeholder="Password">
                <div class="error password"></div>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <button type="submit" class="btn btn-info">Login</button>
            </div>
        </div>
    </div>    
</form>