distro=$(aws cloudfront list-distributions --query "DistributionList.Items[].{Id: Id, AliasDomainName: Aliases.Items[0]}[?AliasDomainName == '$1'] | [0].Id") 
distro="${distro%\"}"
distro="${distro#\"}"

aws cloudfront create-invalidation --distribution-id $distro --paths "/*"