 /*
     Basic producer to send data to kafka from nodejs.
     More Information Here : https://www.npmjs.com/package/kafka-node
 */

 //    Using kafka-node - really nice library
 //    create a producer and connect to a Zookeeper to send the payloads.
 var fileDecoder = require('../common/fileEncodeDecode.js'),
    imageCreator = require('../common/ImageCreator.js');
 var kafka = require('kafka-node'),
     Producer = kafka.Producer,
     client = new kafka.Client('localhost:2181'),
     producer = new Producer(client);

     /*
         Creating a payload, which takes below information
         'topic'     -->    this is the topic we have created in kafka. (test)
         'messages'     -->    data which needs to be sent to kafka. (JSON in our case)
         'partition' -->    which partition should we send the request to. (default)

                         example command to create a topic in kafka: 
                         [kafka@kafka kafka]$ bin/kafka-topics.sh \
                                     --create --zookeeper localhost:2181 \
                                     --replication-factor 1 \
                                     --partitions 1 \
                                     --topic test

                         If there are multiple partition, then we optimize the code here,
                         so that we send request to different partitions. 

     */
     module.exports = {
         sendProductExplainerJson: function (_topic, _message, _partition) {
            payloads = [
             { topic: _topic, messages: _message, partition: 0 },
         ];


        //    producer 'on' ready to send payload to kafka.
        //producer.on('ready', function(){
    		console.log(producer.ready);
    		if (producer.ready){
    			producer.send(payloads, function(err, data){
                 //console.log(_message);
                    console.log(data);
                });
    		}
    	//});

    //producer.on('error', function(err){console.log("ehh.. Message send aitha le")});   
    }, 
    renderPreviewImage: function (_topic, _partition) {

        consumer = new Consumer(
            client,
            [
                { topic: _topic, partition: _partition }
            ],
            {
                autoCommit: false
            }
        );
        consumer.on('message', function (message) {
            console.log("base64EncodedString of the previe image" + message.value);
            var buffer = decoder.base64_decode(message.value);
            imageCreator.createImageFromBuffer(buffer,"c:\\preview.png");   
        });
        
    }
}
     