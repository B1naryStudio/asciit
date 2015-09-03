<form action="/questions">
    <div class="form-horizontal">
        <div class="error all"></div>

        <div class="form-group folder">
            <label for="folder" class="control-label col-md-2 col-sm-2 col-lg-1"><%= _t("folders.folder") %>:</label>
            <div class="col-md-10 col-sm-10 col-lg-11">
                <div class="folder-select-wrapper"></div>
                <span class="help-block hidden"></span>
            </div>
        </div>

        <div class="form-group title">
            <label for="email" class="control-label col-md-2 col-sm-2 col-lg-1"><%= _t("questions.title") %>:</label>
            <div class="col-md-10 col-sm-10 col-lg-11">
                <input type="text" name="title" class="title form-control" placeholder="<%= _t("questions.title") %>">
                <span class="help-block hidden"></span>
            </div>
        </div>

        <div class="form-group folder">
            <label for="tag" class="control-label col-md-2 col-sm-2 col-lg-1"><%= _t("tags.tags") %>:</label>
            <div class="col-md-10 col-sm-10 col-lg-11 tag-select-wrapper"></div>
            <span class="help-block hidden"></span>
        </div>

        <div class="form-group description">
            <div>
                <label for="description" class="control-label"><%= _t("questions.description") %>:</label>
            </div>
            <div>
                <textarea name="description" rows="6" class="description form-control" placeholder="<%= _t("answers.description") %>"></textarea>
                <span class="help-block hidden"></span>
            </div>
        </div>
    </div>
    <div class="form-group controls">
        <button type="submit" class="btn btn-info"><%- _t("ui.save") %></button>
    </div>
</form>