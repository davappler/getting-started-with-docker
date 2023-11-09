

## DNS Round Robin Method

- Round Robin DNS is a simple method of load balancing servers, or for providing simple fault tolerance. Multiple identical servers are configured to provide exactly the same services. All are configured to use the same Internet domain name, but each has a unique IP address.

- Round-robin DNS is a load balancing technique where the balancing is done by a type of DNS server called an `authoritative nameserver`, rather than using a dedicated piece of load-balancing hardware.

-  Round-robin DNS can be used when a website or service has their content hosted on several redundant web servers; when the DNS authoritative nameserver is queried for an IP address, the server hands out a different address each time, operating on a rotation.

- A DNS server with round-robin enabled will have multiple different `A records`, each with the same domain name but a different IP address.

- The IP addresses in a round-robin DNS server are like baseball players in a batting lineup: each one gets a turn and then is moved to the back of the line.






## DNS A record

- "A" stands for "address" and this is the most fundamental type of DNS record.
- "A" record indicates the IP address of a given domain.
- A records only hold IPv4 addresses. If a website has an IPv6 address, it will instead use an "AAAA" record.

![Screenshot](./assets/images/A-Record.png)

- The "@" symbol in this example indicates that this is a record for the root domain
- the "14400" value is the TTL (time to live), listed in seconds.
- The default TTL for A records is 14,400 seconds. This means that if an A record gets updated, it takes 240 minutes (14,400 seconds) to take effect.
- The vast majority of websites only have one A record, but it is possible to have several. Some higher profile websites will have several different A records as part of a technique called round robin load balancing, which can distribute request traffic to one of several IP addresses, each hosting identical content.


## How does it work?

- When someone tries to access the domain name associated with this A record (let's say example.com), `Users` DNS resolver will look up the A record for example.com and retrieve the IPv4 address 192.0.2.1. 
- The resolver can then use this IP address to establish a connection with the server hosting the website or service associated with that domain.


- In Steps:
    - User searches for `example.com` in their browser
    - User's DNS resolver will look for A Record for that domain name `example.com`
    - Once it has the A record, it will fetch it's value, which is an IP address.
    - Then the DNS resolver establishes a connection between the two IP address's, users and servers. 


## When are DNS A records used?
- The most common usage of A records is IP address lookups: matching a domain name (like "example.com") to an IPv4 address
- This enables a user's device to connect with and load a website, without the user memorizing and typing in the actual IP address
- The user's web browser automatically carries this out by sending a query to a DNS resolver.
- 