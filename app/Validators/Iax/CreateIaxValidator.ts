import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class CreateIaxValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(40)]),
    username: schema.string({ trim: true }, [rules.maxLength(40)]),
    secret: schema.string({ trim: true }, [rules.maxLength(40)]),
    context: schema.string({ trim: true }, [rules.maxLength(40)]),
    host: schema.string({ trim: true }, [rules.maxLength(40)]),
    ipaddr: schema.string({ trim: true }, [rules.maxLength(40)]),
    disallow: schema.string.optional({ trim: true }, [
      rules.maxLength(200),
      rules.codecExists(),
    ]),
    allow: schema.string.optional({ trim: true }, [
      rules.maxLength(200),
      rules.codecExists(),
    ]),

    type: schema.enum(['friend', 'user', 'peer'] as const),

    port: schema.number(),

    regcontext: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    dbsecret: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    defaultip: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
    sourceaddress: schema.string.optional({ trim: true }, [
      rules.maxLength(20),
    ]),
    mask: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
    regexten: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    accountcode: schema.string.optional({ trim: true }, [rules.maxLength(80)]),
    mohinterpret: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
    mohsuggest: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
    inkeys: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    outkeys: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    language: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
    callerid: schema.string.optional({ trim: true }, [rules.maxLength(100)]),
    cidNumber: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    fullname: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    auth: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
    codecpriority: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),
    qualify: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
    qualifyfreqok: schema.string.optional({ trim: true }, [
      rules.maxLength(10),
    ]),
    qualifyfreqnotok: schema.string.optional({ trim: true }, [
      rules.maxLength(10),
    ]),
    timezone: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
    amaflags: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
    setvar: schema.string.optional({ trim: true }, [rules.maxLength(20)]),

    regseconds: schema.number.optional(),
    maxauthreq: schema.number.optional(),

    sendani: schema.enum(['yes', 'no'] as const),
    trunk: schema.enum(['yes', 'no'] as const),
    requirecalltoken: schema.enum(['yes', 'no', 'auto'] as const),
    encryption: schema.enum(['yes', 'no', 'aes128'] as const),
    transfer: schema.enum(['yes', 'no', 'mediaonly'] as const),
    jitterbuffer: schema.enum(['yes', 'no'] as const),
    forcejitterbuffer: schema.enum(['yes', 'no'] as const),
    qualifysmoothing: schema.enum(['yes', 'no'] as const),
    adsi: schema.enum(['yes', 'no'] as const),
  })

  public messages = validation
}

export { CreateIaxValidator }
