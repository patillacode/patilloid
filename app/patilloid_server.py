import argparse
import json
import logging
# import os
# import random
import sys
import traceback

from flask import Flask
from flask import render_template


logging.basicConfig(stream=sys.stdout,
                    level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(message)s',
                    handlers=[logging.StreamHandler()])

# set up logging to console
console = logging.StreamHandler()
console.setLevel(logging.INFO)
console.setFormatter(logging.Formatter('%(message)s'))

# add the handler to the root logger
logging.getLogger('').addHandler(console)
logger = logging.getLogger(__name__)

app = Flask(__name__)


@app.route("/")
def main():
    try:
        logger.info("Let's show them Patilloid!")
        return render_template('patilloid.html')
    except:
        logger.error(traceback.format_exc())
        return json.dumps(
            {"error": "Sorry, something bad happened with your request."}), 500


class PatilloidParser(argparse.ArgumentParser):
    def error(self, message):
        sys.stderr.write('error: {0}\n'.format(message))
        self.print_help()
        sys.exit(2)


if __name__ == '__main__':
    try:
        parser = PatilloidParser()
        parser.add_argument("--host",
                            default="127.0.0.1",
                            help="IP to run on [default: 127.0.0.1]")
        parser.add_argument("--port",
                            default=5050,
                            type=int,
                            help="port to listen to [default: 5050")
        args = parser.parse_args()

        app.run(host=args.host, port=args.port)

    except SystemExit:
        logger.info("Farewell!")
    except:
        logger.error(traceback.format_exc())
