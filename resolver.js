{
    
function wizard(obj, args, context, info) {
             return context.db.loadWizardByID(args.id)
             .then((res) => new wizard(res))
         }
}
