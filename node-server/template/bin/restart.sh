#!/bin/bash
LOCAL_HOME=$(cd $(dirname "$0");pwd)
cd $LOCAL_HOME
sh stop.sh
sh start.sh
