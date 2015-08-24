<div class="panel panel-default new-folder-form">
    <div class="panel-heading">
        <h3 class="panel-title"><%= _t("folders.add") %>:</h3>
    </div>
    <div class="panel-body">
        <form class="form-horisontal folders-form">
            <div class="form-group wrapper-fields">
                <div class="row">
                    <label for="title" class="col-sm-2 col-xs-3 title-label">
                        <%= _t("folders.title") %>:
                    </label>
                    <div class="col-sm-10 col-xs-9">
                        <input type="text" class="form-control" name="title" id="title">
                        <span class="help-block hidden"></span>
                    </div>
                </div>
            </div>
            <div class="form-group wrapper-control">
                <input class="submit-btn btn btn-success" type="submit" value="Create">
            </div>
        </form>
    </div>
</div>