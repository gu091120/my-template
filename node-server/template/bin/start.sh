#!/bin/bash
LOCAL_HOME=$(
    cd $(dirname $0)
    pwd
)
APP_DIR=$(
    cd $LOCAL_HOME
    cd ../
    pwd
)
LOG_PATH=$LOCAL_HOME/log
SCRIPTPATH="${APP_DIR}/lib/app"
SERVER_NAME="mySever"

PIDS=$(ps -ef | grep $SCRIPTPATH | grep -v grep | awk '{print $2}')

if [ -n "$PIDS" ]; then
    echo "ERROR: server $SERVER_NAME already started!"
    echo "PIDS: $PIDS"
    exit 1
fi

cd $LOCAL_HOME

npm run start:pro >>$LOG_PATH

NUM=0
while :; do
    echo -e ".\c"
    sleep 1
    let NUM++
    PIDS=$(ps -ef | grep $SCRIPTPATH | grep -v grep | awk '{print $2}')
    if [ -n "$PIDS" ]; then
        echo "Start $SERVER_NAME ok" >>$LOG_PATH
        echo "Start $SERVER_NAME ok"
        break
    fi
    if [ $NUM -gt 10 ]; then
        echo "Start $SERVER_NAME fail" >>$LOG_PATH
        echo "Start $SERVER_NAME fail"
        exit 2
    fi
done
