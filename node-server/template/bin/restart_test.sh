#!/bin/bash
LOCAL_HOME=$(cd $(dirname "$0");pwd)
cd $LOCAL_HOME
sh stop_test.sh
sh start_test.sh
