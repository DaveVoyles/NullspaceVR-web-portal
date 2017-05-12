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
    string data = await req.Content.ReadAsStringAsync();
    List<Node> nodes = new List<Node>();
    nodes = JsonConvert.DeserializeObject<List<Node>>(data);

    foreach (Node n in nodes)
    {    
        log.Info($"Node {n.NodeLabel} {n.Status}");
        using (var context = new NodeContext()){
            if(context.Nodes.Any(a => a.NodeLabel == n.NodeLabel)){
                
                log.Info("Record Exists - Updating");
                
                Node nu = context.Nodes.Where(a => a.NodeLabel == n.NodeLabel)
                    .FirstOrDefault();
                    
                nu.Status = n.Status;
                nu.DateModified = DateTime.Now;

            } else {

                log.Info("Record Not Found - Adding");
                context.Nodes.Add(n);

            }
            await context.SaveChangesAsync();
        }
    }
    
    return req.CreateResponse(HttpStatusCode.Created);
}

