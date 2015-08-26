<div class="panel panel-default new-folder-form">
    <div class="panel-heading">
        <h3 class="panel-title"><%= _t("folders.add") %>:</h3>
    </div>
    <div class="panel-body">
        <form class="form-horisontal folders-form">
            <div class="form-group wrapper-fields">
                <div class="row">
                    <label for="title" class="col-lg-2 col-sm-3 col-xs-4 title-label">
                        <%= _t("folders.title") %>:
                    </label>
                    <div class="col-lg-10 col-sm-9 col-xs-8">
                        <input type="text" class="form-control" name="title" id="title">
                        <span class="help-block hidden"></span>
                    </div>
                </div>
            </div>
            <div class="form-group wrapper-control">
                <input class="submit-btn btn btn-success" type="submit" value="<%- _t("ui.create") %>">
            </div>
        </form>
    </div>
</div>