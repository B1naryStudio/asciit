<form action="/questions">
    <div class="form-horizontal">
        <div class="error all"></div>

        <div class="form-group folder">
            <label for="folder" class="control-label col-md-2 col-sm-2 col-lg-1"><%= _t("folders.folder") %>:</label>
            <div class="col-md-10 col-sm-10 col-lg-11 folder-select-wrapper"></div>
            <div class="error folder"></div>
        </div>

        <div class="form-group title">
            <label for="email" class="control-label col-md-2 col-sm-2 col-lg-1"><%= _t("questions.title") %>:</label>
            <div class="col-md-10 col-sm-10 col-lg-11">
                <input type="text" name="title" class="title form-control" placeholder="<%= _t("questions.title") %>">
                <div class="error title"></div>
            </div>
        </div>

        <div class="form-group folder">
            <label for="tag" class="control-label col-md-2 col-sm-2 col-lg-1"><%= _t("tags.tags") %>:</label>
            <div class="col-md-10 col-sm-10 col-lg-11 tag-select-wrapper"></div>
            <div class="error tag"></div>
        </div>

        <div class="description">
            <div>
                <label for="description" class="control-label"><%= _t("questions.description") %>:</label>
            </div>
            <div>
                <textarea name="description" rows="6" class="description form-control" placeholder="<%= _t("answers.description") %>"></textarea>
                <div class="error description"></div>
            </div>
        </div>
    </div>
    <div class="form-group controls">
        <button type="submit" class="btn btn-info"><%- _t("ui.save") %></button>
    </div>
</form>