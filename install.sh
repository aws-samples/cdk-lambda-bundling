sudo yum install -y maven
sudo rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
sudo yum install -y dotnet-sdk-3.1
dotnet tool install -g Amazon.Lambda.Tools
exec bash -l
