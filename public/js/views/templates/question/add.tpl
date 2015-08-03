<form action="/questions">
    <div class="form-horizontal">
        <div class="error all"></div>
        <div class="control-group">
            <label for="email" class="control-label">Title</label>
            <input type="text" name="title" class="title" placeholder="Title">
            <div class="error title"></div>
        </div>

        <div class="control-group">
            <label for="description" class="control-label">Description</label>
            <textarea name="description" class="description" placeholder="description"></textarea>
            <div class="error description"></div>
        </div>
    </div>
    <div class="control-group">
        <div class="controls">
            <button type="submit" class="btn btn-info">Save</button>
        </div>
    </div>
</form>