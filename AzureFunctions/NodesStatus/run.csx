#load "..\shared\nodedata.csx"

#r "Newtonsoft.Json"
using System.Net;
using System;
using System.Configuration;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using Newtonsoft.Json;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info($"Get Nodes Triggered");  
    List<Node> nodes = new List<Node>();
    using (var context = new NodeContext()){
        nodes = context.Nodes.ToList();
    }  
    return req.CreateResponse(HttpStatusCode.OK, nodes);
}
