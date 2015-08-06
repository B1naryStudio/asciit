<header class="section-header">
    <span class="counter"><%- count %></span> answers
</header>
<ul id="answers" class="list-group"></ul>

<!-- Adding form -->
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Your answer:</h3>
    </div>
    <div class="panel-body">
        <form class="form-horisontal">
            <div class="form-group ">
                <textarea class="form-control" name="description" id="description" rows="6"></textarea>
                <span class="help-block hidden"></span>
            </div>
            <input class="submit-btn btn btn-success" type="submit" value="Save">
        </form>
    </div>
</div>