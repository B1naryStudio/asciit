<form action="/api/v1/user/login">
    <div class="form-horizontal login-form">
        <div class="error all"></div>

        <div class="control-group">
            <label for="email" class="control-label col-sm-4">Email</label>
            <div class="col-sm-8">
                <input type="text" name="email" class="email form-control" placeholder="Email">
                <div class="error email"></div>
            </div>
        </div>

        <div class="control-group">
            <label for="password" class="control-label col-sm-4">Password</label>
            <div class="col-sm-8">
                <input type="password" name="password" class="password form-control" placeholder="Password">
                <div class="error password"></div>
            </div>
        </div>

        <div class="control-group buttons">
            <div class="controls">
                <button type="submit" class="btn btn-info">Login</button>
            </div>
        </div>
    </div>    
</form>