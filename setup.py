
from setuptools import setup, find_packages

setup(
    name='patilloid',
    version='0.0.4',
    description='',
    license='GPLv2',
    packages=find_packages(),
    author='patillacode',
    author_email='patillacode@gmail.com',
    url='https://github.com/patillacode/patilloid',
    install_requires=['bumpversion>=0.5.3',
                      'Flask>=0.10.1',
                      'gitflow>=0.5.1'],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'License :: OSI Approved :: GNU General Public License v2',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7']
)
