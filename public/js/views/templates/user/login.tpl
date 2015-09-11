<form action="/api/v1/user/login">
    <div class="form-horizontal login-form">
        <div class="error all"></div>

        <div class="control-group">
            <label for="email" class="control-label col-md-4 col-lg-4 col-sm-4 col-xs-4">Email</label>
            <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                <input type="text" name="email" class="email form-control" placeholder="Email">
                <div class="error email"></div>
            </div>
        </div>

        <div class="control-group">
            <label for="password" class="control-label col-md-4 col-lg-4 col-sm-4 col-xs-4"><%= _t("ui.password") %></label>
            <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                <input type="password" name="password" class="password form-control" placeholder="<%= _t("ui.password") %>">
                <div class="error password"></div>
            </div>
        </div>

        <div class="control-group buttons">
            <div class="controls">
                <button type="submit" class="btn btn-info"><%= _t("ui.login") %></button>
            </div>
        </div>
    </div>    
</form>