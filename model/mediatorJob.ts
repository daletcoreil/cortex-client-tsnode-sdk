/**
 * Dalet Media Cortex API
 * # Scope Dalet Mediator API allows you to submit long running media jobs managed by Dalet services.  Long running media jobs include: - **Media processing** such as transcoding or automatic QC. - **Automatic metadata extraction** such as automatic speech transcription or face detection.  The Dalet Mediator API is a REST API with typed schema for the payload. # Architecture Job processing is performed on the cloud via dynamic combination of microservices. Dalet Mediator adopts the [EBU MCMA] architecture.  The key objectives of this architecture are to support: - Job management and monitoring - Long running transactions - Event based communication pattern - Service registration and discovery - Horizontal scalability in an elastic manner  The architecture is implemented using the serverless approach - relying on  independent microservices accessible through well documented REST endpoints and sharing a common object model. ## Roles The following services are involved in the processing of media jobs exposed through the Dalet Media Mediator API: - **Mediator**: this is the main entry point to the architecture; this API endpoint supports: 1. Checking authentication using an API key and a token mechanism 2. Verifying quota restrictions before accepting a submitted job 3. Keeping track of usage so that job processing can be tracked and billed 4. Keeping track of jobs metadata as a job repository - **Job Processor**: once a job request is accepted by the mediator, it is assigned to a Job Processor. The Job Processor dispatches the job to an appropriate Job Worker (depending on the job profile and other criteria such as load on the system and cost of operation).  It then keeps track of the progress of the job and its status until completion and possible failures and timeout.  It reports progress to the Mediator through notifications. - **Job Worker**: The Job Worker performs the actual work on the media object, for example, AI metadata extraction (AME) or essence transcoding.  It reports progress to the Job Processor through notifications. - **Service Registry**: The Service Registry keeps track of all active services in the architecture. It is queried by the Mediator and by Processors to discover candidate services to perform jobs.  It is updated whenever a new service is launched or stopped.  The Service Registry also stores the list of all job profiles supported by one of the Job Workers deployed in the architecture. The Dalet Mediator API abstracts away from the complexity of this orchestration and provides a simple endpoint to submit long running jobs and monitor the progress of their execution.  It serves as a facade for the additional technical services for authentication, usage monitoring and service registry.  [EBU MCMA]: /https://tech.ebu.ch/groups/mcma \'EBU MCMA\' ## Job Lifecycle ![Job Lifecyle Diagram](./job_lifecycle.svg \'Job Lifecycle Diagram\')  ## Authentication To use the Dalet Mediator API - you must obtain an APIKey from Dalet.  This key comes in the form of two parameters: * client ID * secret  Given these two parameters, a client program must first obtain an access token (GET /auth/access-token) and then associate this token to every subsequent calls.  When the token expires, the API will return a 401 error code.  In this case, the client must request a new token and resubmit the request. 
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: cortexsupport@dalet.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';
import { JobMediatorStatus } from './jobMediatorStatus';
import { JobOutput } from './jobOutput';

/**
* After a job is submitted to the Dalet Media Mediator service, it is attributed metadata that helps track its lifecycle.  In addition to the input field (Job input / Job output), the JobMediatorEntity provides a unique ID, date created and last modified and usage information (verified quantity and usage ID to reconcile with invoice).  These additional fields are all computed by the mediator and read-only.
*/
export class MediatorJob {
    /**
    * Job ID computed by the Dalet Media Mediator Job registry.  Uniquely identifies the job after it has been accepted by the mediator.
    */
    'id': string;
    /**
    * Datetime when the job was accepted by the Mediator
    */
    'dateCreated': string;
    /**
    * Datetime when the job was last updated by a Job Processor service reporting progress on this job.
    */
    'dateModified': string;
    /**
    * Verified number of units after the job is completed.  Units depend on the job profile (usually, they correspond to the duration of the media).  Invoicing is based on this value, which may be different from the one submitted by the client.
    */
    'quantity': number;
    'status': JobMediatorStatus;
    'jobOutput'?: JobOutput;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "dateCreated",
            "baseName": "dateCreated",
            "type": "string"
        },
        {
            "name": "dateModified",
            "baseName": "dateModified",
            "type": "string"
        },
        {
            "name": "quantity",
            "baseName": "quantity",
            "type": "number"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "JobMediatorStatus"
        },
        {
            "name": "jobOutput",
            "baseName": "jobOutput",
            "type": "JobOutput"
        }    ];

    static getAttributeTypeMap() {
        return MediatorJob.attributeTypeMap;
    }
}
