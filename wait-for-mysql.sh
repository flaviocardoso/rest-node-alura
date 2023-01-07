#!/bin/sh
# wait-for-mysql.sh

shift
#
#mysql -h "meu_mysql" -u root --password=flaviocardoso --silent
until docker exec meu_mysql mysql bash -c "mysql -u root -proot -e 'status' &> /dev/null"; do
    echo "Waiting for database connection"
    sleep 2
done

echo "database connected"
exec "$@"