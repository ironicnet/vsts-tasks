import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'src', 'main.js');
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tr.setInput('templateType', 'builtin');
tr.setInput('azureResourceGroup', 'testrg');
tr.setInput('storageAccountName', 'teststorage');
tr.setInput('baseImageSource', 'customVhd');
tr.setInput('customImageUrl', 'https://bishalpackerimages.blob.core.windows.net/system/Microsoft.Compute/Images/vsts-buildimagetask/Release-1-osDisk.2d175222-b257-405f-a07f-0af4dc4b3dc4.vhd');
tr.setInput('customImageOSType', 'linux');
tr.setInput('location', 'South India');
tr.setInput('packagePath', '/packer-user-scripts/dummy.tar.gz');
tr.setInput('deployScriptPath', '/packer-user-scripts/deploy.sh');
tr.setInput('deployScriptArguments', "\"subdir 1\" false");
tr.setInput('ConnectedServiceName', 'AzureRMSpn');
tr.setInput('imageUri', 'imageUri');
tr.setInput('imageStorageAccount', 'imageStorageAccount');

process.env["ENDPOINT_AUTH_AzureRMSpn"] = "{\"parameters\":{\"serviceprincipalid\":\"spId\",\"serviceprincipalkey\":\"spKey\",\"tenantid\":\"tenant\"},\"scheme\":\"ServicePrincipal\"}";
process.env["ENDPOINT_DATA_AzureRMSpn_SUBSCRIPTIONNAME"] = "sName";
process.env["ENDPOINT_DATA_AzureRMSpn_SUBSCRIPTIONID"] =  "sId";
process.env["ENDPOINT_DATA_AzureRMSpn_SPNOBJECTID"] =  "oId";
process.env["RELEASE_RELEASENAME"] = "Release-1";

// provide answers for task mock
let a: any = <any>{
    "which": {
        "packer": "packer"
    },
    "checkPath": {
        "packer": true,
        "/basedir/DefaultTemplates/custom.linux.template.json": true,
        "/packer-user-scripts/deploy.sh": true
    },
    "exec": {
        "packer --version": {
            "code": 0,
            "stdout": "0.12.3"
        },
        "packer fix -validate=false /tmp/tempdir/100/custom.linux.template.json": {
            "code": 0,
            "stdout": "{ \"some-key\": \"some-value\" }"
        },
        "packer validate -var resource_group=testrg -var storage_account=teststorage -var image_url=https://bishalpackerimages.blob.core.windows.net/system/Microsoft.Compute/Images/vsts-buildimagetask/Release-1-osDisk.2d175222-b257-405f-a07f-0af4dc4b3dc4.vhd -var location=South India -var capture_name_prefix=Release-1 -var script_path=/packer-user-scripts/deploy.sh -var script_name=deploy.sh -var package_path=/packer-user-scripts/dummy.tar.gz -var package_name=dummy.tar.gz -var script_arguments=\"subdir 1\" false -var subscription_id=sId -var client_id=spId -var client_secret=spKey -var tenant_id=tenant -var object_id=oId /tmp/tempdir/100/custom.linux.template-fixed.json": {
            "code": 0,
            "stdout": "Executed Successfully"
        },
        "packer build -force -var resource_group=testrg -var storage_account=teststorage -var image_url=https://bishalpackerimages.blob.core.windows.net/system/Microsoft.Compute/Images/vsts-buildimagetask/Release-1-osDisk.2d175222-b257-405f-a07f-0af4dc4b3dc4.vhd -var location=South India -var capture_name_prefix=Release-1 -var script_path=/packer-user-scripts/deploy.sh -var script_name=deploy.sh -var package_path=/packer-user-scripts/dummy.tar.gz -var package_name=dummy.tar.gz -var script_arguments=\"subdir 1\" false -var subscription_id=sId -var client_id=spId -var client_secret=spKey -var tenant_id=tenant -var object_id=oId /tmp/tempdir/100/custom.linux.template-fixed.json": {
            "code": process.env["__packer_build_fails__"] === "true" ? 1 : 0,
            "stdout": process.env["__packer_build_fails__"] === "true" ? "packer build failed\r\nsome error" : "Executed Successfully\nOSDiskUri: https://bishalpackerimages.blob.core.windows.net/system/Microsoft.Compute/Images/packer/packer-osDisk.e2e08a75-2d73-49ad-97c2-77f8070b65f5.vhd\nStorageAccountLocation: SouthIndia",
        },
        "packer fix -validate=false \\tmp\\tempdir\\100\\custom.linux.template.json": {
            "code": 0,
            "stdout": "Executed Successfully"
        },
        "packer validate -var resource_group=testrg -var storage_account=teststorage -var image_url=https://bishalpackerimages.blob.core.windows.net/system/Microsoft.Compute/Images/vsts-buildimagetask/Release-1-osDisk.2d175222-b257-405f-a07f-0af4dc4b3dc4.vhd -var location=South India -var capture_name_prefix=Release-1 -var script_path=/packer-user-scripts/deploy.sh -var script_name=deploy.sh -var package_path=/packer-user-scripts/dummy.tar.gz -var package_name=dummy.tar.gz -var script_arguments=\"subdir 1\" false -var subscription_id=sId -var client_id=spId -var client_secret=spKey -var tenant_id=tenant -var object_id=oId \\tmp\\tempdir\\100\\custom.linux.template-fixed.json": {
            "code": 0,
            "stdout": "Executed Successfully"
        },
        "packer build -force -var resource_group=testrg -var storage_account=teststorage -var image_url=https://bishalpackerimages.blob.core.windows.net/system/Microsoft.Compute/Images/vsts-buildimagetask/Release-1-osDisk.2d175222-b257-405f-a07f-0af4dc4b3dc4.vhd -var location=South India -var capture_name_prefix=Release-1 -var script_path=/packer-user-scripts/deploy.sh -var script_name=deploy.sh -var package_path=/packer-user-scripts/dummy.tar.gz -var package_name=dummy.tar.gz -var script_arguments=\"subdir 1\" false -var subscription_id=sId -var client_id=spId -var client_secret=spKey -var tenant_id=tenant -var object_id=oId \\tmp\\tempdir\\100\\custom.linux.template-fixed.json": {
            "code": process.env["__packer_build_fails__"] === "true" ? 1 : 0,
            "stdout": process.env["__packer_build_fails__"] === "true" ? "packer build failed\r\nsome error" : "Executed Successfully\nOSDiskUri: https://bishalpackerimages.blob.core.windows.net/system/Microsoft.Compute/Images/packer/packer-osDisk.e2e08a75-2d73-49ad-97c2-77f8070b65f5.vhd\nStorageAccountLocation: SouthIndia",
        }
    },
    "exist": {
        "/tmp/tempdir/100": true,
        "\\tmp\\tempdir\\100": true,
        "/tmp/tempdir/100/": true,
        "\\tmp\\tempdir\\100/": true,
        "packer": true
    },
    "rmRF": {
        "/tmp/tempdir/100": { 'success': true },
        "\\tmp\\tempdir\\100": { 'success': true }
    }
};

var ut = require('../src/utilities');
tr.registerMock('./utilities', {
    IsNullOrEmpty : ut.IsNullOrEmpty,
    HasItems : ut.HasItems,
    StringWritable: ut.StringWritable,
    PackerVersion: ut.PackerVersion,
    isGreaterVersion: ut.isGreaterVersion,
    deleteDirectory: function(dir) {
        console.log("rmRF " + dir);
    },
    copyFile: function(source: string, destination: string) {
        if(process.env["__copy_fails__"] === "true") {
            throw "copy failed while copying from " + source;
        } else {
            console.log('copying ' + source + ' to ' + destination);
        }
    },
    writeFile: function(filePath: string, content: string) {
        console.log("writing to file " + filePath + " content: " + content);
    },
    findMatch: function(root: string, patterns: string[] | string) {
        return [patterns];
    },
    getCurrentTime: function() {
        return 100;
    },
    getTempDirectory: function() {
        return "/tmp/tempdir"
    },
    getCurrentDirectory: function() {
        return "/basedir/currdir";
    }
});

tr.setAnswers(a);
tr.run();