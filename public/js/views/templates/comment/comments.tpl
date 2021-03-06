<div class="folding-controls">
    <div class="control unfold"><%= _t("ui.showMore", {num: ""}) %></div>
    <div class="control fold"><%= _t("ui.fold") %></div>
</div>

<ul class="list-group comments-region"></ul>

<div class="panel panel-default comment-form" tabindex="-1">
    <div class="panel-heading">
        <h3 class="panel-title"><%= _t("comment.your") %>:</h3>
    </div>
    <div class="panel-body">
        <form class="form-horisontal comments-form">
            <div class="form-group ">
                <textarea class="form-control" name="text" id="text" rows="6"></textarea>
                <span class="help-block hidden"></span>
            </div>
            <input class="btn btn-sm submit-btn btn-success" type="submit" value="<%- _t("ui.save") %>">
        </form>
    </div>
</div>
