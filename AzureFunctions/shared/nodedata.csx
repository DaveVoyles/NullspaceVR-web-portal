using System.Net;
using System;
using System.Configuration;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

[Table("Node")]
public class Node 
{
    public Node(){
        this.DateModified = DateTime.Now;
    }
    
    public int NodeId { get; set; }
    public string NodeLabel  {get; set; }
    public bool Status { get; set; }
    public DateTime DateModified { get; set; }
}

public class NodeContext : DbContext
{
    public NodeContext()
        : base("name=NodeContext")
    {
    }

    public virtual DbSet<Node> Nodes { get; set; }
}