<div class="answers-list" >
    <header class="section-header">
        <%= _t("answers.answers") %>:
        <span class="counter answers"><%- count %></span>
    </header>
    <div class="folding-controls">
        <div class="control unfold"><%= _t("ui.showMore", {num: ""}) %></div>
        <div class="control fold"><%= _t("ui.fold") %></div>
    </div>
    <ul id="answers" class="list-group"></ul>

    <!-- Adding form -->
    <div class="panel panel-default new-answer">
        <div class="panel-heading">
            <h3 class="panel-title"><%- _t("answers.your") %>:</h3>
        </div>
        <div class="panel-body">
            <form class="form-horisontal" id="new-answer-form">
                <div class="form-group">
                    <textarea name="description" id="description" rows="6"></textarea>
                    <span class="help-block hidden"></span>
                </div>
            </form>
        </div>
    </div>

    <div class="new-answer-controls">
        <input class="submit-btn btn btn-success" type="submit" form='new-answer-form' value="<%- _t("ui.save") %>">
    </div>
</div>