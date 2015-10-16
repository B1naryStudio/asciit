<form action="">
    <div class="form-horizontal">
        <div class="form-group">
            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <p>
                    <%= message %>
                </p>
            </div>
        </div>
    </div>
    <div class="form-group controls">
        <button type="submit" class="btn btn-sm btn-info"><%- _t("ui.yes") %></button>
        <button type="button" class="btn btn-sm btn-info cancel-confirm"><%- _t("ui.no") %></button>
    </div>
</form>