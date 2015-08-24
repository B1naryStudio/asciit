<div class="answers-list" >
    <header class="section-header">
        <span class="counter answers">
            <%= _t("answers.answers") %>: <%- count %>
        </span>
    </header>
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