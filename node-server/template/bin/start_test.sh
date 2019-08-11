# #!/bin/bash
# LOCAL_HOME=$(cd $(dirname $0);pwd)
# APP_DIR=$(cd $LOCAL_HOME;cd ../;pwd)
# LOG_PATH=$LOCAL_HOME/log
# SERVER_NAME="myserver"

# PIDS=$(ps -ef | grep lib/app.js)


    

#!/bin/bash
LOCAL_HOME=$(cd $(dirname "$0");pwd)
app_dir=$(cd ${LOCAL_HOME};cd ../;pwd)

scriptPath="${app_dir}/lib/app.j"

echo "$scriptPath"
PIDS=$(ps -ef | grep $scriptPath | grep -v grep| awk '{print $2}')
echo "$PIDS"