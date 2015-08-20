<form action="/questions">
    <div class="form-horizontal">
        <div class="error all"></div>

        <div class="form-group folder">
            <label for="folder" class="control-label col-sm-1">Folder</label>
            <div class="col-sm-11 folder-select-wrapper"></div>
            <div class="error folder"></div>
        </div>

        <div class="form-group title">
            <label for="email" class="control-label col-sm-1">Title</label>
            <div class="col-sm-11">
                <input type="text" name="title" class="title form-control" placeholder="Title">
                <div class="error title"></div>
            </div>
        </div>

        <div class="form-group folder">
            <label for="tag" class="control-label col-sm-1">Tags</label>
            <div class="col-sm-11 tag-select-wrapper"></div>
            <div class="error tag"></div>
        </div>

        <div class="description">
            <div class="row">
                <label for="description" class="control-label col-sm-1">Description</label>
            </div>
            <div>
                <textarea name="description" rows="6" class="description form-control" placeholder="description"></textarea>
                <div class="error description"></div>
            </div>
        </div>
    </div>
    <div class="form-group controls">
        <button type="submit" class="btn btn-info">Save</button>
    </div>
</form>