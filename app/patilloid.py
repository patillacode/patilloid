import traceback

from flask import (
    Blueprint,
    current_app,
    jsonify,
    render_template,
)

bp = Blueprint('patilloid', __name__)


@bp.route('/', methods=('GET',))
def index():
    try:
        current_app.logger.info("Let's show them Patilloid!")
        return render_template('patilloid.html')
    except Exception as err:
        current_app.logger.error(err)
        current_app.logger.error(traceback.format_exc())
        return (
            jsonify({"error": "Sorry, something bad happened with your request."}),
            400,
        )
